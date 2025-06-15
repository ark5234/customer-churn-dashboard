import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const PredictiveDashboard = ({ data }) => {
  const [predictions, setPredictions] = useState(null);

  // Mock data - replace with actual predictions
  const predictionData = {
    totalCustomers: 100,
    predictedToChurn: 35,
    predictedToStay: 65,
    highRiskCustomers: [
      { id: 1, name: 'Customer 1', churnProbability: 0.92, riskFactors: ['Month-to-Month', 'No Tech Support', 'High Charges'] },
      { id: 2, name: 'Customer 2', churnProbability: 0.88, riskFactors: ['Month-to-Month', 'No Security', 'Fiber Optic'] },
      { id: 3, name: 'Customer 3', churnProbability: 0.85, riskFactors: ['Electronic Check', 'No Support', 'Senior Citizen'] },
      { id: 4, name: 'Customer 4', churnProbability: 0.82, riskFactors: ['Month-to-Month', 'No Security', 'High Charges'] },
      { id: 5, name: 'Customer 5', churnProbability: 0.78, riskFactors: ['Fiber Optic', 'No Support', 'Electronic Check'] }
    ]
  };

  const pieData = [
    { name: 'Predicted to Stay', value: predictionData.predictedToStay },
    { name: 'Predicted to Churn', value: predictionData.predictedToChurn }
  ];

  const COLORS = ['#00C49F', '#FF8042'];

  const handleFileUpload = (event) => {
    // Implement file upload and prediction logic here
    console.log('File uploaded:', event.target.files[0]);
    setPredictions(predictionData);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Predictive Dashboard
        </Typography>

        <Grid container spacing={3}>
          {/* File Upload Section */}
          <Grid item xs={12}>
            <Box mb={3}>
              <input
                accept=".csv"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={handleFileUpload}
              />
              <label htmlFor="raised-button-file">
                <Button variant="contained" component="span">
                  Upload Customer Data
                </Button>
              </label>
            </Box>
          </Grid>

          {predictions && (
            <>
              {/* Prediction Summary */}
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Prediction Summary
                </Typography>
                <Box height={300}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>

              {/* High Risk Customers Table */}
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Top 5 High-Risk Customers
                </Typography>
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Customer ID</TableCell>
                        <TableCell>Churn Probability</TableCell>
                        <TableCell>Risk Factors</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {predictionData.highRiskCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell>{customer.name}</TableCell>
                          <TableCell>{(customer.churnProbability * 100).toFixed(1)}%</TableCell>
                          <TableCell>{customer.riskFactors.join(', ')}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

              {/* Key Insights */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Key Insights:
                </Typography>
                <ul>
                  <li>
                    <Typography variant="body2">
                      {predictionData.predictedToChurn}% of customers are predicted to churn
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      High-risk customers typically have multiple risk factors
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      Month-to-month contracts and lack of support are common risk factors
                    </Typography>
                  </li>
                </ul>
              </Grid>
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PredictiveDashboard; 