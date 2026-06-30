import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, CheckCircle2, AlertTriangle, FileText, Database } from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';
import Button from '../../../components/common/Button';
import Badge from '../../../components/common/Badge';
import StatisticsService from '../../../services/data/StatisticsService';
import CountUp from 'react-countup';

const HeroSection = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    StatisticsService.getPlatformStats().then(data => setStats(data));
  }, []);

  const riskData = React.useMemo(() => ({
    labels: ['Legal Risk', 'Financial Risk', 'Documentation', 'Clear'],
    datasets: [{
      data: [12, 18, 20, 50],
      backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6', '#10b981'],
      borderWidth: 0,
      cutout: '75%',
      hoverOffset: 4
    }]
  }), []);

  const riskOptions = React.useMemo(() => ({
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    maintainAspectRatio: false,
    cutout: '80%',
    layout: { padding: 0 }
  }), []);

  const activityFeed = [
    { text: 'Ownership chain verified', icon: CheckCircle2, color: 'text-emerald-500' },
    { text: 'Financial registry clear', icon: CheckCircle2, color: 'text-emerald-500' },
    { text: 'Mutation pending', icon: AlertTriangle, color: 'text-amber-500' }
  ];

  const progressBars = [
    { name: 'Legal', progress: '100%', color: 'bg-emerald-500' },
    { name: 'Ownership', progress: '100%', color: 'bg-emerald-500' },
    { name: 'Financial', progress: '100%', color: 'bg-emerald-500' },
    { name: 'Documents', progress: '65%', color: 'bg-amber-400' }
  ];

  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-white border-b border-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50/50 via-slate-50/20 to-white pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 xl:px-10 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Copy & CTA (45%) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-5 w-full pr-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 mb-8 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-xs font-semibold text-slate-700 tracking-wide">Dataset Engine Live</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
              Verify property <br className="hidden md:block" />
              with <span className="text-blue-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">mathematical precision.</span>
            </h1>

            <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-[90%]">
              The enterprise standard for land record verification. Aggregate legal, financial, and municipal data into a single, verifiable graph of truth.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
              <Link to="/register" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-sm font-semibold group bg-slate-900 hover:bg-slate-800 text-white border-transparent rounded-xl shadow-sm px-8">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/insights" className="w-full sm:w-auto">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto text-sm font-medium text-slate-600 hover:text-slate-900 rounded-xl px-6">
                  Read Documentation
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-slate-400" />
                <span>
                  {stats ? <CountUp end={stats.properties} formattingFn={n => (n / 1000000).toFixed(1) + 'M+'} /> : '...'} Properties
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" />
                <span>
                  {stats ? <CountUp end={stats.documents} formattingFn={n => (n / 1000000).toFixed(1) + 'M+'} /> : '...'} Documents
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Dashboard Mockup (55%) */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-7 w-full relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl blur opacity-30"></div>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col relative">

              {/* Dashboard Header */}
              <div className="bg-slate-50/50 px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5 mr-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                  </div>
                  <span className="font-mono text-xs font-semibold text-slate-500 tracking-wider">PID: IND-774-291</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <span className="text-slate-400">Region: BLR</span>
                  <div className="bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wide">VERIFIED</div>
                </div>
              </div>

              {/* Dashboard Grid 2x2 */}
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">

                {/* Top Left: Risk Score */}
                <div className="p-8 flex flex-col items-center justify-center border-b border-slate-100">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 self-start w-full">Overall Score</h4>
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    <div className="absolute inset-0">
                      <Doughnut data={riskData} options={riskOptions} />
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-4xl font-extrabold text-slate-900 tracking-tighter">82</span>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-8 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div>Clear</div>
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500"></div>Fin.</div>
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500"></div>Doc.</div>
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500"></div>Leg.</div>
                  </div>
                </div>

                {/* Top Right: Progress Bars */}
                <div className="p-8 border-b border-slate-100">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Verification Progress</h4>
                  <div className="space-y-5">
                    {progressBars.map((bar, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs font-semibold text-slate-700 mb-2">
                          <span>{bar.name}</span>
                          <span>{bar.progress}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${bar.color}`} style={{ width: bar.progress }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Left: Activity Feed */}
                <div className="p-8 md:border-b-0 border-slate-100">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">Recent Activity</h4>
                  <div className="space-y-4">
                    {activityFeed.map((item, i) => (
                      <div key={i} className="flex items-center justify-between pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <item.icon className={`w-4 h-4 ${item.color}`} />
                          <span className="text-sm font-medium text-slate-700">{item.text}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">Just now</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Right: Document KPI */}
                <div className="p-8 flex flex-col justify-center">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Doc Completion</h4>
                  <div className="flex items-end gap-3 mb-4">
                    <span className="text-5xl font-extrabold text-slate-900 tracking-tighter leading-none">92<span className="text-3xl text-slate-400">%</span></span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full w-[92%]"></div>
                  </div>
                  <p className="text-xs text-slate-500 mt-4 font-medium leading-relaxed">
                    14/15 core documents acquired. Waiting on regional mutation extract.
                  </p>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
