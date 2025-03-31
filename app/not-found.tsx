'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import error404Animation from '../public/404-animation.json';

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
});

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-96 h-96">
        <Lottie
          animationData={error404Animation}
          loop={true}
          autoplay={true}
          className="w-full h-full"
        />
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mt-8">Page non trouvée</h1>
      <p className="text-gray-600 mt-4 text-center max-w-md">
        Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
} 