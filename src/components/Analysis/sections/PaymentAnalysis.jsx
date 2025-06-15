import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const PaymentAnalysis = ({ data }) => {
  // Mock data - replace with actual data
  const paymentMethodData = [
    { method: 'Electronic Check', churnRate: 45.2, count: 1200 },
    { method: 'Mailed Check', churnRate: 28.7, count: 800 },
    { method: 'Bank Transfer', churnRate: 18.5, count: 600 },
    { method: 'Credit Card', churnRate: 15.3, count: 500 }
  ];

  const paymentDistribution = [
    { name: 'Electronic Check', value: 38.7 },
    { name: 'Mailed Check', value: 25.8 },
    { name: 'Bank Transfer', value: 19.4 },
    { name: 'Credit Card', value: 16.1 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Payment Method Analysis
        </Typography>

        <Grid container spacing={3}>
          {/* Payment Method Churn Rates */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Churn Rate by Payment Method
            </Typography>
            <Box height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={paymentMethodData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="method" />
                  <YAxis label={{ value: 'Churn Rate (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="churnRate" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          {/* Payment Method Distribution */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Payment Method Distribution
            </Typography>
            <Box height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {paymentDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
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
                  Electronic check users have the highest churn rate at 45.2%
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Credit card users show the lowest churn rate at 15.3%
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Electronic check is the most popular payment method (38.7% of customers)
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Traditional payment methods (mailed check, bank transfer) show moderate churn rates
                </Typography>
              </li>
            </ul>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PaymentAnalysis; 