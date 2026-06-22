import { Building, MapPin, Users, Target, CheckCircle, Lightbulb } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About Land Insight Portal</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering informed land decisions through comprehensive data analysis and expert construction recommendations.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Our platform helps users identify land ownership, construction suitability, and real-time updates about land conditions. 
                We provide comprehensive data analysis to support informed decision-making in land development and construction projects.
              </p>
              <p>
                Built as a frontend-only Phase-1 implementation, this platform showcases modern web technologies and user experience design 
                while delivering practical value to land developers, builders, and property investors.
              </p>
              <p>
                By combining interactive mapping with detailed plot analysis, we bridge the gap between raw land data and actionable insights 
                for construction planning and development strategies.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Interactive Mapping</h3>
                  <p className="text-gray-600 text-sm">Click-to-explore plot details</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <Building className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Construction Insights</h3>
                  <p className="text-gray-600 text-sm">Expert recommendations</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Professional Network</h3>
                  <p className="text-gray-600 text-sm">Verified builders & contractors</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Precise Plot Analysis</h3>
              <p className="text-gray-600">Detailed soil type analysis, area calculations, and suitability assessments for each plot.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Expert Recommendations</h3>
              <p className="text-gray-600">Construction recommendations with verified builder suggestions based on plot characteristics.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Smart Interface</h3>
              <p className="text-gray-600">Intuitive card-based and map-based navigation for easy plot exploration and comparison.</p>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">R</span>
              </div>
              <p className="text-sm font-medium text-gray-700">React 18</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 font-bold">RT</span>
              </div>
              <p className="text-sm font-medium text-gray-700">Redux Toolkit</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 font-bold">TW</span>
              </div>
              <p className="text-sm font-medium text-gray-700">TailwindCSS</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-600 font-bold">RR</span>
              </div>
              <p className="text-sm font-medium text-gray-700">React Router</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-red-600 font-bold">V</span>
              </div>
              <p className="text-sm font-medium text-gray-700">Vite</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

