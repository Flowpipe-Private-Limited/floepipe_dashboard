import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import KycReuseComponet from '../../components/common/KycInputOut';
import { getServiceById } from '../../utils/KYCContext/servicesMetadata';

const KYCServicePage = () => {
    const { serviceId } = useParams();
    const service = getServiceById(serviceId);

    if (!service) {
        // Redirect to dashboard or show 404 if service not found
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <KycReuseComponet data={service.config} />
    );
};

export default KYCServicePage;
