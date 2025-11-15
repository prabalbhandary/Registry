import React from "react";

// 1. Spinning Circles Loader (Most Popular)
export const SpinnerLoader = ({ size = "md", text }) => {
    const sizeClasses = {
        sm: "h-6 w-6 border-2",
        md: "h-12 w-12 border-4",
        lg: "h-16 w-16 border-4"
    };

    return (
        <div className="flex flex-col justify-center items-center py-20" role="status">
            <div className={`animate-spin ${sizeClasses[size]} border-blue-500 border-t-transparent rounded-full`}></div>
            {text && <span className="mt-3 text-gray-600 text-sm">{text}</span>}
            <span className="sr-only">Loading...</span>
        </div>
    );
};

// 2. Dots Loader (Clean & Minimal)
export const DotsLoader = ({ text }) => {
    return (
        <div className="flex flex-col justify-center items-center py-20" role="status">
            <div className="flex space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            {text && <span className="mt-3 text-gray-600 text-sm">{text}</span>}
            <span className="sr-only">Loading...</span>
        </div>
    );
};

// 3. Pulse Loader (Smooth & Modern)
export const PulseLoader = ({ text }) => {
    return (
        <div className="flex flex-col justify-center items-center py-20" role="status">
            <div className="relative">
                <div className="w-10 h-10 border-4 border-blue-200 rounded-full"></div>
                <div className="w-10 h-10 border-4 border-blue-500 rounded-full absolute top-0 left-0 animate-ping"></div>
            </div>
            {text && <span className="mt-3 text-gray-600 text-sm">{text}</span>}
            <span className="sr-only">Loading...</span>
        </div>
    );
};

// 4. Bars Loader (Equalizer Style)
export const BarsLoader = ({ text }) => {
    return (
        <div className="flex flex-col justify-center items-center py-20" role="status">
            <div className="flex space-x-1.5 h-12 items-end">
                <div className="w-2 bg-blue-500 rounded-sm animate-pulse" style={{ height: '60%', animationDelay: '0ms', animationDuration: '1s' }}></div>
                <div className="w-2 bg-blue-500 rounded-sm animate-pulse" style={{ height: '100%', animationDelay: '150ms', animationDuration: '1s' }}></div>
                <div className="w-2 bg-blue-500 rounded-sm animate-pulse" style={{ height: '80%', animationDelay: '300ms', animationDuration: '1s' }}></div>
                <div className="w-2 bg-blue-500 rounded-sm animate-pulse" style={{ height: '100%', animationDelay: '450ms', animationDuration: '1s' }}></div>
                <div className="w-2 bg-blue-500 rounded-sm animate-pulse" style={{ height: '60%', animationDelay: '600ms', animationDuration: '1s' }}></div>
            </div>
            {text && <span className="mt-3 text-gray-600 text-sm">{text}</span>}
            <span className="sr-only">Loading...</span>
        </div>
    );
};

// 5. Circular Progress (Stylish Spinner)
export const CircularLoader = ({ text }) => {
    return (
        <div className="flex flex-col justify-center items-center py-20" role="status">
            <div className="relative w-16 h-16">
                <svg className="animate-spin" viewBox="0 0 50 50">
                    <circle
                        className="stroke-gray-200"
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        strokeWidth="4"
                    />
                    <circle
                        className="stroke-blue-500"
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        strokeWidth="4"
                        strokeDasharray="80 100"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
            {text && <span className="mt-3 text-gray-600 text-sm">{text}</span>}
            <span className="sr-only">Loading...</span>
        </div>
    );
};

// Demo Component to showcase all loaders
const LoaderDemo = () => {
    const [activeLoader, setActiveLoader] = React.useState('spinner');

    const loaders = {
        spinner: { component: SpinnerLoader, name: 'Spinner' },
        dots: { component: DotsLoader, name: 'Dots' },
        pulse: { component: PulseLoader, name: 'Pulse' },
        bars: { component: BarsLoader, name: 'Bars' },
        circular: { component: CircularLoader, name: 'Circular' }
    };

    const LoaderComponent = loaders[activeLoader].component;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Modern Loading Components</h1>
                <p className="text-gray-600 mb-8">Choose your preferred loader style</p>

                <div className="flex flex-wrap gap-2 mb-8">
                    {Object.entries(loaders).map(([key, { name }]) => (
                        <button
                            key={key}
                            onClick={() => setActiveLoader(key)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeLoader === key
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {name}
                        </button>
                    ))}
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <LoaderComponent text="Loading your content..." />
                </div>

                <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Usage Example</h2>
                    <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                        {`import { ${loaders[activeLoader].name}Loader } from './Loader';

function MyComponent() {
  const [loading, setLoading] = useState(true);
  
  if (loading) {
    return <${loaders[activeLoader].name}Loader text="Loading..." />;
  }
  
  return <div>Your content</div>;
}`}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default LoaderDemo;