import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const TenureAnalysis = ({ data }) => {
  // Mock data - replace with actual data
  const monthlyChurnData = [
    { month: 'Jan', churnCount: 120 },
    { month: 'Feb', churnCount: 145 },
    { month: 'Mar', churnCount: 132 },
    { month: 'Apr', churnCount: 158 },
    { month: 'May', churnCount: 142 },
    { month: 'Jun', churnCount: 165 }
  ];

  const tenureBucketsData = [
    { bucket: '0-12 months', churnRate: 35.2 },
    { bucket: '13-24 months', churnRate: 28.5 },
    { bucket: '25-36 months', churnRate: 22.1 },
    { bucket: '37-48 months', churnRate: 18.7 },
    { bucket: '49+ months', churnRate: 15.3 }
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Tenure and Churn Analysis
        </Typography>

        <Grid container spacing={3}>
          {/* Monthly Churn Trend */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Monthly Churn Trend
            </Typography>
            <Box height={300} className="chart-container tenure">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyChurnData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'Number of Churns', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="churnCount"
                    name="Churn Count"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          {/* Tenure Buckets Analysis */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Churn Rate by Tenure Buckets
            </Typography>
            <Box height={300} className="chart-container tenure">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={tenureBucketsData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="bucket" />
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
                  New customers (0-12 months) have the highest churn rate at 35.2%
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Churn rate decreases significantly after the first year
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Long-term customers (49+ months) have the lowest churn rate at 15.3%
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Monthly churn trend shows slight upward movement in recent months
                </Typography>
              </li>
            </ul>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TenureAnalysis; 