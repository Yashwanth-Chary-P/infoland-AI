import React, { useState, useEffect } from 'react';
import { Navigation, Map, GraduationCap, Activity, TreePine, Store } from 'lucide-react';
import { getLocationIntelligenceByPropertyId } from '../../../services/data/LocationService';
import LoadingSpinner from '../../../components/LoadingSpinner';

const LocationTab = ({ plot }) => {
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchLocationData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getLocationIntelligenceByPropertyId(plot.property_id);
        if (mounted) {
          setLocationData(data);
        }
      } catch (err) {
        if (mounted) {
          if (err.response && err.response.status === 404) {
            setLocationData(null); // No data
          } else {
            setError(err.message || 'Unable to load location information.');
          }
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    if (plot?.property_id) {
      fetchLocationData();
    }

    return () => {
      mounted = false;
    };
  }, [plot?.property_id]);

  if (loading) {
    return <div className="p-8"><LoadingSpinner message="Loading location intelligence..." /></div>;
  }

  if (error) {
    return (
      <div className="p-8">
        <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8">Location Intelligence</h2>
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm font-medium">
          Unable to load location information.
        </div>
      </div>
    );
  }

  if (!locationData) {
    return (
      <div className="p-8">
        <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8">Location Intelligence</h2>
        <div className="bg-slate-50 text-slate-500 p-4 rounded-xl border border-slate-100 text-sm font-medium">
          No location intelligence available.
        </div>
      </div>
    );
  }

  const score = locationData.location_score;
  const hasScore = score != null;

  return (
    <div className="p-8">
      <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8">Location Intelligence</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-4">Connectivity Profile</h3>
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-6">
            <div className="flex items-center gap-3 text-slate-500 mb-4">
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                <Navigation className="w-4 h-4 text-slate-400" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">Location Score</span>
            </div>
            
            <div className="flex items-end gap-2 mb-2">
              <span className={`text-5xl font-black tracking-tighter ${!hasScore ? 'text-slate-400' : score >= 80 ? 'text-emerald-500' : score >= 50 ? 'text-amber-500' : 'text-red-500'}`}>
                {hasScore ? score : 'N/A'}
              </span>
              <span className="text-lg text-slate-400 font-bold mb-1">{hasScore ? '/ 100' : ''}</span>
            </div>
          </div>
          
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-5">
             <p className="text-sm text-slate-600 leading-relaxed font-medium">
               {hasScore ? 'Location scoring data is calculated based on proximity to infrastructure and amenities.' : 'Location scoring data is not yet available for this property.'}
             </p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-4">Points of Interest</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col justify-between">
               <div className="flex items-center gap-2 mb-2">
                 <GraduationCap className="w-4 h-4 text-blue-500" />
                 <span className="text-xs font-bold text-slate-700">Schools</span>
               </div>
               <p className="text-2xl font-black text-slate-900">{locationData.nearby_school_count ?? 0}</p>
               <p className="text-[10px] text-slate-500 font-medium mt-1">Nearest: {locationData.distance_to_nearest_school_km != null ? `${locationData.distance_to_nearest_school_km.toFixed(2)} km` : 'N/A'}</p>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col justify-between">
               <div className="flex items-center gap-2 mb-2">
                 <Activity className="w-4 h-4 text-rose-500" />
                 <span className="text-xs font-bold text-slate-700">Hospitals</span>
               </div>
               <p className="text-2xl font-black text-slate-900">{locationData.nearby_hospital_count ?? 0}</p>
               <p className="text-[10px] text-slate-500 font-medium mt-1">Nearest: {locationData.distance_to_nearest_hospital_km != null ? `${locationData.distance_to_nearest_hospital_km.toFixed(2)} km` : 'N/A'}</p>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col justify-between">
               <div className="flex items-center gap-2 mb-2">
                 <TreePine className="w-4 h-4 text-emerald-500" />
                 <span className="text-xs font-bold text-slate-700">Parks</span>
               </div>
               <p className="text-2xl font-black text-slate-900">{locationData.nearby_park_count ?? 0}</p>
               <p className="text-[10px] text-slate-500 font-medium mt-1">Nearest: {locationData.distance_to_nearest_park_km != null ? `${locationData.distance_to_nearest_park_km.toFixed(2)} km` : 'N/A'}</p>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col justify-between">
               <div className="flex items-center gap-2 mb-2">
                 <Store className="w-4 h-4 text-purple-500" />
                 <span className="text-xs font-bold text-slate-700">Commercial</span>
               </div>
               <p className="text-2xl font-black text-slate-900">{locationData.nearby_commercial_count ?? 0}</p>
               <p className="text-[10px] text-slate-500 font-medium mt-1">Nearest: {locationData.distance_to_nearest_commercial_km != null ? `${locationData.distance_to_nearest_commercial_km.toFixed(2)} km` : 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationTab;
