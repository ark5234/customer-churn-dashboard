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

  const COLORS = ['#6366f1', '#ec4899', '#06b6d4'];

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
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(255,255,255,0.1)" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
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
                  <defs>
                    <linearGradient id="colorSenior" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="category" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" label={{ value: 'Churn Rate (%)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                  <Bar dataKey="churnRate" fill="url(#colorSenior)" radius={[4, 4, 0, 0]} />
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
                  <defs>
                    <linearGradient id="colorPartner" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="status" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" label={{ value: 'Churn Rate (%)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                  <Bar dataKey="churnRate" fill="url(#colorPartner)" radius={[4, 4, 0, 0]} />
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