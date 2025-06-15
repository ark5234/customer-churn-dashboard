import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CommunicationImpact = ({ data }) => {
  // Mock data - replace with actual data
  const phoneServiceData = [
    { type: 'Phone Service', churnRate: 26.8 },
    { type: 'No Phone Service', churnRate: 25.9 }
  ];

  const multipleLinesData = [
    { type: 'Single Line', churnRate: 25.2 },
    { type: 'Multiple Lines', churnRate: 28.4 }
  ];

  const combinedData = [
    { category: 'Phone + Multiple Lines', churnRate: 29.1 },
    { category: 'Phone + Single Line', churnRate: 24.8 },
    { category: 'No Phone Service', churnRate: 25.9 }
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Communication Services Impact
        </Typography>

        <Grid container spacing={3}>
          {/* Phone Service Analysis */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Churn Rate by Phone Service
            </Typography>
            <Box height={200}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={phoneServiceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis label={{ value: 'Churn Rate (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="churnRate" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          {/* Multiple Lines Analysis */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Churn Rate by Number of Lines
            </Typography>
            <Box height={200}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={multipleLinesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis label={{ value: 'Churn Rate (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="churnRate" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          {/* Combined Analysis */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Combined Phone Service Analysis
            </Typography>
            <Box height={200}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={combinedData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis label={{ value: 'Churn Rate (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="churnRate" fill="#ffc658" />
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
                  Phone service has minimal impact on overall churn rates
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Customers with multiple lines show slightly higher churn rates
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Single line phone service customers have the lowest churn rate
                </Typography>
              </li>
            </ul>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CommunicationImpact; 