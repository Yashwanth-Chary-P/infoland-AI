import mongoose from 'mongoose';
import dotenv from 'dotenv';
import legalService from './src/services/legal.service.js';
import ownerService from './src/services/owner.service.js';

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection;
  
  // Step 1: Find active dispute
  const activeStatuses = ['active', 'pending', 'ongoing', 'filed', 'open', 'in_progress', 'under_review'];
  
  const courtDisputes = await db.collection('court_disputes').find({
    status: { $in: activeStatuses }
  }).toArray();
  
  let selectedPropertyId = null;
  let selectedDispute = null;
  
  for (const dispute of courtDisputes) {
    const propId = dispute.property_id;
    // Step 2: Check other collections
    const oeCount = await db.collection('ownership_events').countDocuments({ property_id: propId });
    const ownerCount = await db.collection('owners').countDocuments({ property_id: propId });
    const registryCount = await db.collection('property_registry').countDocuments({ property_id: propId });
    
    if (oeCount > 0 && ownerCount > 0 && registryCount > 0) {
      selectedPropertyId = propId;
      selectedDispute = dispute;
      break;
    }
  }
  
  if (!selectedPropertyId) {
    console.log("No valid property found with active disputes AND full history.");
    process.exit(1);
  }
  
  const dbOwnershipEvents = await db.collection('ownership_events').find({ property_id: selectedPropertyId }).toArray();
  const dbOwners = await db.collection('owners').find({ property_id: selectedPropertyId }).toArray();
  const dbCourtDisputes = await db.collection('court_disputes').find({ property_id: selectedPropertyId }).toArray();

  const results = {};
  
  try {
    results['/api/ownership/:propertyId/transfers'] = await ownerService.getOwnershipTransfers(selectedPropertyId);
    results['/api/verification/:propertyId/legal'] = await legalService.getLegalStatus(selectedPropertyId);
    results['/api/verification/:propertyId/legal-summary'] = await legalService.getLegalSummary(selectedPropertyId);
    results['/api/verification/:propertyId/legal-statistics'] = await legalService.getLegalStatistics(selectedPropertyId);
    results['/api/verification/:propertyId/legal-details'] = await legalService.getLegalDetails(selectedPropertyId);
  } catch(e) {
    console.error(e);
  }

  const finalReportData = {
    selectedPropertyId,
    selectedDispute,
    db: {
      ownershipEvents: dbOwnershipEvents,
      owners: dbOwners,
      courtDisputes: dbCourtDisputes
    },
    api: results
  };
  
  console.log(JSON.stringify(finalReportData, null, 2));
  process.exit(0);
}

run().catch(console.error);
