import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const BillingAnalysis = ({ data }) => {
  // Mock data - replace with actual data
  const chargesData = [
    { monthlyCharges: 20, totalCharges: 240, churned: true },
    { monthlyCharges: 45, totalCharges: 540, churned: false },
    { monthlyCharges: 70, totalCharges: 840, churned: true },
    { monthlyCharges: 90, totalCharges: 1080, churned: true },
    { monthlyCharges: 35, totalCharges: 420, churned: false },
    // Add more data points as needed
  ];

  const monthlyChargesByChurn = [
    { status: 'Churned', min: 25, q1: 45, median: 65, q3: 85, max: 105 },
    { status: 'Retained', min: 20, q1: 35, median: 55, q3: 75, max: 95 }
  ];

  const contractBillingData = [
    { category: 'Month-to-Month + Paperless', churnRate: 45.2 },
    { category: 'Month-to-Month + Paper', churnRate: 38.7 },
    { category: '1-Year + Paperless', churnRate: 15.8 },
    { category: '1-Year + Paper', churnRate: 12.3 },
    { category: '2-Year + Paperless', churnRate: 5.2 },
    { category: '2-Year + Paper', churnRate: 4.1 }
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Billing and Charges Analysis
        </Typography>

        <Grid container spacing={3}>
          {/* Scatter Plot: Monthly vs Total Charges */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Monthly Charges vs Total Charges
            </Typography>
            <Box height={400}>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid />
                  <XAxis
                    type="number"
                    dataKey="monthlyCharges"
                    name="Monthly Charges"
                    label={{ value: 'Monthly Charges ($)', position: 'bottom' }}
                  />
                  <YAxis
                    type="number"
                    dataKey="totalCharges"
                    name="Total Charges"
                    label={{ value: 'Total Charges ($)', angle: -90, position: 'left' }}
                  />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Legend />
                  <Scatter
                    name="Churned"
                    data={chargesData.filter(d => d.churned)}
                    fill="#ff7300"
                  />
                  <Scatter
                    name="Retained"
                    data={chargesData.filter(d => !d.churned)}
                    fill="#8884d8"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          {/* Contract Type and Paperless Billing */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Churn Rate by Contract Type and Billing Method
            </Typography>
            <Box height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={contractBillingData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} />
                  <YAxis label={{ value: 'Churn Rate (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="churnRate" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          {/* Key Insights */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Key Insights:
            </Typography>
            <ul>
              <li>
                <Typography variant="body2">
                  Higher monthly charges correlate with increased churn probability
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Month-to-month contracts with paperless billing have the highest churn rate
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Two-year contracts show significantly lower churn rates regardless of billing method
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Paperless billing customers tend to churn more than paper billing customers
                </Typography>
              </li>
            </ul>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BillingAnalysis; 