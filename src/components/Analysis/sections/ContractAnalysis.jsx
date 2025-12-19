import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ContractAnalysis = ({ data }) => {
  // Mock data - replace with actual data
  const contractTypeData = [
    { type: 'Month-to-Month', churnRate: 42.7 },
    { type: 'One-Year', churnRate: 11.8 },
    { type: 'Two-Year', churnRate: 2.8 }
  ];

  const contractWithTechSupport = [
    { category: 'Month-to-Month + No Support', churnRate: 52.3 },
    { category: 'Month-to-Month + Support', churnRate: 33.1 },
    { category: 'One-Year + No Support', churnRate: 18.5 },
    { category: 'One-Year + Support', churnRate: 5.1 },
    { category: 'Two-Year + No Support', churnRate: 4.2 },
    { category: 'Two-Year + Support', churnRate: 1.4 }
  ];

  const contractWithSecurity = [
    { category: 'Month-to-Month + No Security', churnRate: 48.7 },
    { category: 'Month-to-Month + Security', churnRate: 36.7 },
    { category: 'One-Year + No Security', churnRate: 15.2 },
    { category: 'One-Year + Security', churnRate: 8.4 },
    { category: 'Two-Year + No Security', churnRate: 3.5 },
    { category: 'Two-Year + Security', churnRate: 2.1 }
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Contract Type Analysis
        </Typography>

        <Grid container spacing={3}>
          {/* Basic Contract Type Analysis */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Churn Rate by Contract Type
            </Typography>
            <Box height={300} className="chart-container contract">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={contractTypeData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                >
                  <defs>
                    <linearGradient id="colorContract" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="type" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" label={{ value: 'Churn Rate (%)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                  <Bar dataKey="churnRate" fill="url(#colorContract)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          {/* Contract Type with Tech Support */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Contract Type vs Tech Support
            </Typography>
            <Box height={300} className="chart-container contract">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={contractWithTechSupport}
                  margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                >
                  <defs>
                    <linearGradient id="colorTech" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" label={{ value: 'Churn Rate (%)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                  <Bar dataKey="churnRate" fill="url(#colorTech)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          {/* Contract Type with Online Security */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Contract Type vs Online Security
            </Typography>
            <Box height={300} className="chart-container contract">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={contractWithSecurity}
                  margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                >
                  <defs>
                    <linearGradient id="colorSecurity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" label={{ value: 'Churn Rate (%)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                  <Bar dataKey="churnRate" fill="url(#colorSecurity)" radius={[4, 4, 0, 0]} />
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
                  Month-to-month contracts have significantly higher churn rates (42.7%)
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Two-year contracts show the lowest churn rate (2.8%)
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Tech support reduces churn rates across all contract types
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Online security has a strong impact on reducing churn, especially for month-to-month contracts
                </Typography>
              </li>
            </ul>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ContractAnalysis; 