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
import PDFDownload from './sections/PredictiveDashboard';
import SegmentExplorer from './sections/SegmentExplorer';
import InsightsSummary from './sections/InsightsSummary';

const Analysis = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Customer Churn Analysis Dashboard
        </Typography>
        <PDFDownload />
      </Box>
      
      <Grid container spacing={3}>
        {/* Overall Churn Summary - Full Width */}
        <Grid item xs={12}>
          <ChurnSummary />
        </Grid>

        {/* Key Metrics - Two Columns */}
        <Grid item xs={12} md={6}>
          <FeatureImpact />
        </Grid>
        <Grid item xs={12} md={6}>
          <DemographicBreakdown />
        </Grid>

        {/* Services Analysis - Full Width */}
        <Grid item xs={12}>
          <ServicesAnalysis />
        </Grid>

        {/* Communication and Tenure - Two Columns */}
        <Grid item xs={12} md={6}>
          <CommunicationImpact />
        </Grid>
        <Grid item xs={12} md={6}>
          <TenureAnalysis />
        </Grid>

        {/* Billing Analysis - Full Width */}
        <Grid item xs={12}>
          <BillingAnalysis />
        </Grid>

        {/* Payment and Contract - Two Columns */}
        <Grid item xs={12} md={6}>
          <PaymentAnalysis />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContractAnalysis />
        </Grid>

        {/* Segment Explorer and Insights - Two Columns */}
        <Grid item xs={12} md={6}>
          <SegmentExplorer />
        </Grid>
        <Grid item xs={12} md={6}>
          <InsightsSummary />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Analysis; 