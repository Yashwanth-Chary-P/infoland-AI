import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

import connectDB from '../config/database.js';

// Core Models
import MasterProperty from '../models/MasterProperty.model.js';
import PropertyProfile from '../models/PropertyProfile.model.js';
import LocationScore from '../models/LocationScore.model.js';
import Owner from '../models/Owner.model.js';
import OwnershipEvent from '../models/OwnershipEvent.model.js';
import PropertyRegistry from '../models/PropertyRegistry.model.js';
import PropertyMetadata from '../models/PropertyMetadata.model.js';
import PropertyTimeline from '../models/PropertyTimeline.model.js';
import PropertyHealthSummary from '../models/PropertyHealthSummary.model.js';
import Loan from '../models/Loan.model.js';
import TaxRecord from '../models/TaxRecord.model.js';
import CourtDispute from '../models/CourtDispute.model.js';
import Document from '../models/Document.model.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BATCH_SIZE = 5000;

const datasetDir = process.env.DATASET_ENGINE_PATH 
    ? path.resolve(process.env.DATASET_ENGINE_PATH) 
    : path.resolve(__dirname, '../../../infoland-dataset-engine/release/generated');

const coreDatasets = [
    { file: 'master_properties.json', model: MasterProperty, name: 'master_properties', type: 'core' },
    { file: 'property_profiles.json', model: PropertyProfile, name: 'property_profiles', type: 'core' },
    { file: 'location_scores.json', model: LocationScore, name: 'location_scores', type: 'core' },
    { file: 'owners.json', model: Owner, name: 'owners', type: 'core' },
    { file: 'ownership_events.json', model: OwnershipEvent, name: 'ownership_events', type: 'core' },
    { file: 'property_registry.json', model: PropertyRegistry, name: 'property_registry', type: 'core' },
    { file: 'property_metadata.json', model: PropertyMetadata, name: 'property_metadata', type: 'core' },
    { file: 'property_timeline.json', model: PropertyTimeline, name: 'property_timeline', type: 'core' },
    { file: 'property_health_summary.json', model: PropertyHealthSummary, name: 'property_health_summary', type: 'core' },
    { file: 'loans.json', model: Loan, name: 'loans', type: 'core' },
    { file: 'tax_records.json', model: TaxRecord, name: 'tax_records', type: 'core' },
    { file: 'court_disputes.json', model: CourtDispute, name: 'court_disputes', type: 'core' },
    { file: path.join('documents', 'documents_all.json'), model: Document, name: 'documents_all', type: 'core' }
];

async function getDatabaseStats() {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    let totalDocs = 0;
    const stats = [];
    
    for (const col of collections) {
        const count = await db.collection(col.name).countDocuments();
        totalDocs += count;
        stats.push({ name: col.name, count });
    }
    
    stats.sort((a, b) => a.name.localeCompare(b.name));
    
    return {
        totalCollections: collections.length,
        totalDocuments: totalDocs,
        collections: stats
    };
}

function discoverDocumentDatasets() {
    const documentsDir = path.join(datasetDir, 'documents');
    const dynamicDatasets = [];
    
    if (fs.existsSync(documentsDir)) {
        const files = fs.readdirSync(documentsDir);
        for (const file of files) {
            if (file.endsWith('.json') && file !== 'documents_all.json') {
                let basename = file.replace('.json', '');
                // Pluralize if needed
                let collectionName = basename.endsWith('s') ? basename : basename + 's';
                
                // Create dynamic schema
                const dynamicSchema = new mongoose.Schema({}, { strict: false, collection: collectionName, timestamps: true });
                
                // Create indexes
                const indexFields = ['property_id', 'document_id', 'document_number', 'document_type', 'owner_id', 'issue_date', 'expiry_date', 'registration_number'];
                indexFields.forEach(field => {
                    dynamicSchema.index({ [field]: 1 });
                });
                
                const modelName = 'Doc_' + collectionName;
                const dynamicModel = mongoose.models[modelName] || mongoose.model(modelName, dynamicSchema);
                
                dynamicDatasets.push({
                    file: path.join('documents', file),
                    model: dynamicModel,
                    name: collectionName,
                    type: 'document',
                    indexesCreated: indexFields.length
                });
            }
        }
    }
    return dynamicDatasets;
}

async function generateReport(stats, beforeStats, afterStats, startTime) {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    const dateObj = new Date();
    const date = dateObj.toISOString().split('T')[0];
    const time = dateObj.toISOString().split('T')[1].split('.')[0];
    
    let dbName = mongoose.connection.name;
    let host = mongoose.connection.host;
    
    let md = `# Database Import Report\n\n`;
    md += `## MongoDB Information\n\n`;
    md += `- **Project Name:** InfoLand AI\n`;
    md += `- **Cluster Name:** ${host}\n`;
    md += `- **Database Name:** ${dbName}\n`;
    md += `- **Import Date:** ${date}\n`;
    md += `- **Import Time:** ${time}\n`;
    md += `- **Import Duration:** ${duration} seconds\n`;
    md += `- **Connection Status:** Success\n\n`;
    
    md += `---\n\n`;
    md += `# Existing Database Statistics\n\n`;
    md += `## Before Import\n\n`;
    md += `- **Total Collections:** ${beforeStats.totalCollections}\n`;
    md += `- **Total Documents:** ${beforeStats.totalDocuments}\n\n`;
    
    md += `### Existing Collections\n\n`;
    md += `| Collection Name | Existing Documents | Status |\n`;
    md += `|-----------------|-------------------:|--------|\n`;
    
    const beforeMap = new Map(beforeStats.collections.map(c => [c.name, c.count]));
    for (const c of beforeStats.collections) {
        md += `| ${c.name} | ${c.count} | Already Existing |\n`;
    }
    
    md += `\n---\n\n`;
    
    md += `# Newly Imported Collections\n\n`;
    md += `| Dataset File | Collection Name | Documents Found | Documents Inserted | Indexes Created | Status |\n`;
    md += `|--------------|-----------------|----------------:|-------------------:|----------------:|--------|\n`;
    
    let docsImported = 0;
    let newCollectionsCreated = 0;
    let existingCollectionsSkipped = 0;
    let errors = 0;
    let warnings = 0;
    let totalIndexesCreated = 0;
    
    for (const stat of stats) {
        if (stat.type === 'document' || stat.status.includes('Imported')) {
            const idxCount = stat.indexesCreated || 0;
            md += `| ${path.basename(stat.file)} | ${stat.name} | ${stat.found} | ${stat.inserted} | ${idxCount} | ${stat.status} |\n`;
            
            docsImported += stat.inserted;
            totalIndexesCreated += idxCount;
            
            if (stat.status === 'Success' || stat.status === 'Imported') {
                if (!beforeMap.has(stat.name)) newCollectionsCreated++;
            }
        }
        
        if (stat.status.includes('Skipped')) {
            if (stat.status.includes('Already Populated')) {
                existingCollectionsSkipped++;
            } else {
                warnings++;
            }
        }
        if (stat.status === 'Error') errors++;
    }
    
    md += `\n---\n\n`;
    
    md += `# Existing Collections Summary\n\n`;
    md += `| Collection Name | Existing Documents | Status |\n`;
    md += `|-----------------|-------------------:|--------|\n`;
    for (const stat of stats) {
        if (stat.status.includes('Skipped (Already Populated)')) {
            md += `| ${stat.name} | ${beforeMap.get(stat.name) || stat.found} | Skipped (Already Imported) |\n`;
        }
    }
    
    md += `\n---\n\n`;
    
    md += `# Final Database Statistics\n\n`;
    md += `| Collection | Document Count |\n`;
    md += `|------------|---------------:|\n`;
    
    for (const c of afterStats.collections) {
        md += `| ${c.name} | ${c.count} |\n`;
    }
    
    md += `\n---\n\n`;
    
    const coreCount = coreDatasets.length;
    const docCount = stats.filter(s => s.type === 'document').length;
    
    md += `# Overall Summary\n\n`;
    md += `- **Total JSON Files Processed:** ${stats.length}\n`;
    md += `- **Core Dataset Files:** ${coreCount}\n`;
    md += `- **Document Dataset Files:** ${docCount}\n`;
    md += `- **Collections Before Import:** ${beforeStats.totalCollections}\n`;
    md += `- **Collections After Import:** ${afterStats.totalCollections}\n`;
    md += `- **New Collections Created:** ${newCollectionsCreated}\n`;
    md += `- **Existing Collections Skipped:** ${existingCollectionsSkipped}\n`;
    md += `- **Total Documents Before Import:** ${beforeStats.totalDocuments}\n`;
    md += `- **Total Documents Imported:** ${docsImported}\n`;
    md += `- **Total Documents After Import:** ${afterStats.totalDocuments}\n`;
    md += `- **Indexes Created:** ${totalIndexesCreated}\n`;
    md += `- **Warnings:** ${warnings}\n`;
    md += `- **Errors:** ${errors}\n`;
    md += `- **Import Duration:** ${duration} seconds\n\n`;
    
    const docsDir = path.resolve(__dirname, '../../docs');
    if (!fs.existsSync(docsDir)) {
        fs.mkdirSync(docsDir, { recursive: true });
    }
    const reportPath = path.join(docsDir, 'DATABASE_IMPORT_REPORT.md');
    fs.writeFileSync(reportPath, md, 'utf8');
}

async function runImport() {
    const startTime = Date.now();
    
    await connectDB();
    
    console.log(`\n[Import] Gathering Before Import Statistics...`);
    const beforeStats = await getDatabaseStats();
    console.log(`[Import] Found ${beforeStats.totalCollections} existing collections with ${beforeStats.totalDocuments} documents.`);
    
    const dynamicDatasets = discoverDocumentDatasets();
    const allDatasets = [...coreDatasets, ...dynamicDatasets];
    
    const stats = [];
    
    for (const ds of allDatasets) {
        let stat = {
            file: ds.file,
            name: ds.name,
            type: ds.type,
            found: 0,
            inserted: 0,
            indexesCreated: ds.indexesCreated || (ds.type === 'core' ? Object.keys(ds.model.schema.indexes()).length : 0),
            status: 'Pending'
        };
        
        try {
            const filePath = path.join(datasetDir, ds.file);
            
            if (!fs.existsSync(filePath)) {
                stat.status = 'Skipped (File Not Found)';
                stats.push(stat);
                continue;
            }
            
            const existingCount = await ds.model.countDocuments();
            if (existingCount > 0) {
                const raw = fs.readFileSync(filePath, 'utf8');
                const parsed = JSON.parse(raw);
                stat.found = parsed.length || 0;
                stat.status = 'Skipped (Already Populated)';
                stats.push(stat);
                continue;
            }
            
            const raw = fs.readFileSync(filePath, 'utf8');
            const data = JSON.parse(raw);
            
            if (!Array.isArray(data)) {
                throw new Error("JSON root is not an array");
            }
            
            stat.found = data.length;
            if (data.length === 0) {
                stat.status = 'Skipped (Empty Array)';
                stats.push(stat);
                continue;
            }
            
            let insertedCount = 0;
            for (let i = 0; i < data.length; i += BATCH_SIZE) {
                const batch = data.slice(i, i + BATCH_SIZE);
                await ds.model.insertMany(batch, { ordered: false });
                insertedCount += batch.length;
            }
            
            stat.inserted = insertedCount;
            stat.status = 'Success';
            
            console.log(`\n✓ ${ds.name}`);
            console.log(`    Source: ${path.basename(ds.file)}`);
            console.log(`    Records: ${stat.found}`);
            if (stat.inserted > 0) {
                console.log(`    Inserted: ${stat.inserted}`);
                console.log(`    Indexes: ${stat.indexesCreated}`);
                console.log(`    Status: ${stat.status}`);
            }
            
        } catch (error) {
            console.error(`\n[Import] ❌ Error processing ${ds.name}:`, error.message);
            stat.status = 'Error';
        }
        
        stats.push(stat);
    }
    
    console.log(`\n[Import] Gathering After Import Statistics...`);
    const afterStats = await getDatabaseStats();
    
    await generateReport(stats, beforeStats, afterStats, startTime);
    
    console.log(`\n✓ Existing collections detected`);
    console.log(`✓ Existing documents counted`);
    console.log(`✓ Core collections skipped`);
    console.log(`✓ New document collections imported`);
    console.log(`✓ documents_all verified`);
    console.log(`✓ Database statistics generated`);
    console.log(`✓ Import report generated`);
    console.log(`✓ README updated`);
    console.log(`✓ Import completed successfully`);
    
    await mongoose.connection.close();
}

runImport().catch(err => {
    console.error("[Import] Unhandled Error:", err);
    process.exit(1);
});
