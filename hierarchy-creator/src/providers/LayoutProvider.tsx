import React from 'react';

interface LayoutProviderProps {
  children: React.ReactNode;
}

const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <main className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-md">
        {children}
      </main>
    </div>
  );
};

export default LayoutProvider;
