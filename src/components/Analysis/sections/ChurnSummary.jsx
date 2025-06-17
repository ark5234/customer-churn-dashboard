import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Grid, CircularProgress } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { getChurnSummary } from '../../../services/api';

const COLORS = ['#0088FE', '#00C49F'];

const ChurnSummary = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getChurnSummary();
        setData(response);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
            <CircularProgress />
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent>
          <Typography color="error">Error: {error}</Typography>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card>
        <CardContent>
          <Typography>No data available. Please upload customer data first.</Typography>
        </CardContent>
      </Card>
    );
  }

  const pieData = [
    { name: 'Churned', value: data.churnRate },
    { name: 'Retained', value: data.retentionRate }
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Overall Churn Summary
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Key Metrics
              </Typography>
              <Typography>
                Total Customers: {data.totalCustomers}
              </Typography>
              <Typography>
                Churn Rate: {data.churnRate?.toFixed(1)}%
              </Typography>
              <Typography>
                Retention Rate: {data.retentionRate?.toFixed(1)}%
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 2 }} gutterBottom>
                Contract Breakdown
              </Typography>
              {data.contractBreakdown?.map((contract) => (
                <Typography key={contract.Contract || contract.contract}>
                  {(contract.Contract || contract.contract)}: {(contract.Churn ?? contract.churn)?.toFixed(1)}% churn rate
                </Typography>
              ))}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ChurnSummary; 