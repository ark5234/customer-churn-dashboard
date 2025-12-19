import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ServicesAnalysis = ({ data }) => {
  // Mock data - replace with actual data
  const internetServiceData = [
    { type: 'Fiber Optic', churnRate: 41.9 },
    { type: 'DSL', churnRate: 19.2 },
    { type: 'No Internet', churnRate: 7.2 }
  ];

  const additionalServicesData = [
    { service: 'Online Security', withService: 15.2, withoutService: 42.8 },
    { service: 'Tech Support', withService: 17.2, withoutService: 40.5 },
    { service: 'Streaming TV', withService: 30.2, withoutService: 27.5 },
    { service: 'Streaming Movies', withService: 29.8, withoutService: 27.9 }
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Services Usage Analysis
        </Typography>

        <Grid container spacing={3}>
          {/* Internet Service Analysis */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Churn Rate by Internet Service Type
            </Typography>
            <Box height={300} className="chart-container services">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={internetServiceData}>
                  <defs>
                    <linearGradient id="colorInternet" x1="0" y1="0" x2="0" y2="1">
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
                  <Bar dataKey="churnRate" fill="url(#colorInternet)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          {/* Additional Services Analysis */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Churn Rate by Additional Services
            </Typography>
            <Box height={300} className="chart-container services">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={additionalServicesData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorWith" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.2}/>
                    </linearGradient>
                    <linearGradient id="colorWithout" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="service" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" label={{ value: 'Churn Rate (%)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                  <Legend wrapperStyle={{ color: '#94a3b8' }} />
                  <Bar dataKey="withService" name="With Service" fill="url(#colorWith)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="withoutService" name="Without Service" fill="url(#colorWithout)" radius={[4, 4, 0, 0]} />
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
                  Fiber optic customers have the highest churn rate at 41.9%
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Customers without online security are 2.8x more likely to churn
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Tech support significantly reduces churn probability
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Streaming services have minimal impact on churn rates
                </Typography>
              </li>
            </ul>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ServicesAnalysis; 