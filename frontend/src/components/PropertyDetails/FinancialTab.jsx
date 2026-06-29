import React from 'react';
import { Landmark, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import DynamicFieldList from '../DynamicFieldList';

const FinancialTab = ({ plot }) => {
  const {
    loans = [],
    taxes = [],
    courtDisputes = [],
  } = plot;

  const totalPendingTaxes = taxes.reduce((acc, tax) => acc + (parseFloat(tax.amount_due) || 0), 0);
  const activeLoans = loans.length;
  const activeDisputes = courtDisputes.length;

  return (
    <div className="space-y-8">
      
      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col items-center justify-center text-center">
          <Landmark className={`w-8 h-8 mb-2 ${activeLoans > 0 ? 'text-yellow-500' : 'text-green-500'}`} />
          <h3 className="text-gray-500 font-medium mb-1">Active Loans</h3>
          <p className="text-2xl font-bold text-gray-800">{activeLoans}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col items-center justify-center text-center">
          <FileText className={`w-8 h-8 mb-2 ${totalPendingTaxes > 0 ? 'text-orange-500' : 'text-green-500'}`} />
          <h3 className="text-gray-500 font-medium mb-1">Pending Taxes</h3>
          <p className="text-2xl font-bold text-gray-800">₹{totalPendingTaxes.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col items-center justify-center text-center">
          <AlertTriangle className={`w-8 h-8 mb-2 ${activeDisputes > 0 ? 'text-red-500' : 'text-green-500'}`} />
          <h3 className="text-gray-500 font-medium mb-1">Court Disputes</h3>
          <p className="text-2xl font-bold text-gray-800">{activeDisputes}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Loans Section */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 flex items-center">
            <Landmark className="w-5 h-5 mr-2 text-yellow-600" />
            Loan Records
          </h2>
          <div className="space-y-4">
            {loans.length > 0 ? (
              loans.map((loan, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <DynamicFieldList data={loan} excludedKeys={["property_id", "loan_id"]} />
                </div>
              ))
            ) : (
              <div className="flex items-center text-green-600 bg-green-50 p-4 rounded-lg">
                 <CheckCircle className="w-5 h-5 mr-2" />
                 <p className="font-medium">No active loans.</p>
              </div>
            )}
          </div>
        </div>

        {/* Taxes Section */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-orange-600" />
            Tax Records
          </h2>
          <div className="space-y-4">
            {taxes.length > 0 ? (
              taxes.map((tax, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <DynamicFieldList data={tax} excludedKeys={["property_id", "tax_id"]} />
                </div>
              ))
            ) : (
              <div className="flex items-center text-green-600 bg-green-50 p-4 rounded-lg">
                 <CheckCircle className="w-5 h-5 mr-2" />
                 <p className="font-medium">No pending tax records.</p>
              </div>
            )}
          </div>
        </div>

        {/* Court Disputes Section */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
            Court Disputes
          </h2>
          <div className="space-y-4">
            {courtDisputes.length > 0 ? (
              courtDisputes.map((dispute, idx) => (
                <div key={idx} className="bg-red-50 p-4 rounded-lg border border-red-100">
                  <p className="font-bold text-red-800 mb-2">{dispute.dispute_id}</p>
                  <DynamicFieldList data={dispute} excludedKeys={["property_id", "dispute_id"]} />
                </div>
              ))
            ) : (
              <div className="flex items-center text-green-600 bg-green-50 p-4 rounded-lg">
                 <CheckCircle className="w-5 h-5 mr-2" />
                 <p className="font-medium">No active court disputes.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default FinancialTab;
