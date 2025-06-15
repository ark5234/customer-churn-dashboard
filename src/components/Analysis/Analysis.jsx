import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import ChurnSummary from './sections/ChurnSummary';
import FeatureImpact from './sections/FeatureImpact';
import DemographicBreakdown from './sections/DemographicBreakdown';
import ServicesAnalysis from './sections/ServicesAnalysis';
import CommunicationImpact from './sections/CommunicationImpact';
import TenureAnalysis from './sections/TenureAnalysis';
import BillingAnalysis from './sections/BillingAnalysis';
import PaymentAnalysis from './sections/PaymentAnalysis';
import ContractAnalysis from './sections/ContractAnalysis';
import PredictiveDashboard from './sections/PredictiveDashboard';
import SegmentExplorer from './sections/SegmentExplorer';
import InsightsSummary from './sections/InsightsSummary';

const Analysis = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Customer Churn Analysis Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Overall Churn Summary */}
        <Grid item xs={12}>
          <ChurnSummary />
        </Grid>

        {/* Feature Impact */}
        <Grid item xs={12} md={6}>
          <FeatureImpact />
        </Grid>

        {/* Demographic Breakdown */}
        <Grid item xs={12} md={6}>
          <DemographicBreakdown />
        </Grid>

        {/* Services Analysis */}
        <Grid item xs={12}>
          <ServicesAnalysis />
        </Grid>

        {/* Communication Impact */}
        <Grid item xs={12} md={6}>
          <CommunicationImpact />
        </Grid>

        {/* Tenure Analysis */}
        <Grid item xs={12} md={6}>
          <TenureAnalysis />
        </Grid>

        {/* Billing Analysis */}
        <Grid item xs={12}>
          <BillingAnalysis />
        </Grid>

        {/* Payment Analysis */}
        <Grid item xs={12} md={6}>
          <PaymentAnalysis />
        </Grid>

        {/* Contract Analysis */}
        <Grid item xs={12} md={6}>
          <ContractAnalysis />
        </Grid>

        {/* Predictive Dashboard */}
        <Grid item xs={12}>
          <PredictiveDashboard />
        </Grid>

        {/* Segment Explorer */}
        <Grid item xs={12} md={6}>
          <SegmentExplorer />
        </Grid>

        {/* Insights Summary */}
        <Grid item xs={12} md={6}>
          <InsightsSummary />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Analysis; 