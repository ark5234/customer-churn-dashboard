import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DemographicBreakdown = ({ data }) => {
  // Mock data - replace with actual data
  const genderData = [
    { name: 'Male', value: 45 },
    { name: 'Female', value: 55 }
  ];

  const seniorData = [
    { category: 'Senior', churnRate: 41.2 },
    { category: 'Non-Senior', churnRate: 23.8 }
  ];

  const partnerData = [
    { status: 'With Partner', churnRate: 20.5 },
    { status: 'Without Partner', churnRate: 32.7 }
  ];

  const dependentData = [
    { status: 'With Dependents', churnRate: 18.3 },
    { status: 'Without Dependents', churnRate: 29.6 }
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Demographic Breakdown
        </Typography>

        <Grid container spacing={3}>
          {/* Gender Distribution */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Churn by Gender
            </Typography>
            <Box height={200} className="chart-container demographic">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          {/* Senior Citizen Analysis */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Churn Rate by Senior Status
            </Typography>
            <Box height={200} className="chart-container demographic">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={seniorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis label={{ value: 'Churn Rate (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="churnRate" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          {/* Partner Status */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Churn Rate by Partner Status
            </Typography>
            <Box height={200} className="chart-container demographic">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={partnerData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis label={{ value: 'Churn Rate (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="churnRate" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          {/* Dependents Status */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Churn Rate by Dependents
            </Typography>
            <Box height={200} className="chart-container demographic">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dependentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis label={{ value: 'Churn Rate (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="churnRate" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DemographicBreakdown; 