import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CardDashboard from '@/Parts/CardDashboard';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div className="py-5 px-4">
                <div className="grid grid-cols-5 gap-4">
                    <CardDashboard
                        className="from-rose-500 to-rose-300"
                        icon="bi-list-check"
                        title="260"
                        subtitle="Work Order"
                    />
                    <CardDashboard
                        className="from-emerald-500 to-emerald-300"
                        icon="bi-pc-display"
                        title="158"
                        subtitle="Assets"
                        />
                    <CardDashboard
                        className="from-amber-500 to-amber-300"
                        icon="bi-mouse2-fill"
                        title="80%"
                        subtitle="Accessories"
                    />
                    <CardDashboard
                        className="from-cyan-500 to-cyan-300"
                        icon="bi-bar-chart-fill"
                        title="80%"
                        subtitle="Downtime"
                    />
                    <CardDashboard
                        className="from-slate-500 to-slate-300"
                        icon="bi-bar-chart-fill"
                        title="80%"
                        subtitle="Downtime"
                    />

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
