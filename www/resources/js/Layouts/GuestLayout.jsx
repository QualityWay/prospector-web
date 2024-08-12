import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[url('../assets/images/pagrisa_background.jpg')] bg-no-repeat bg-cover bg-center ">
            <div>
                <Link href="/">
                    <img src="../assets/images/pagrisa_logo.png" className="w-20 h-20 fill-current" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
