import { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-gray-100">
      {children}
    </div>
  );
}
