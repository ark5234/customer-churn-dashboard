import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Grid, FormControl, InputLabel, Select, MenuItem, Slider, Button } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SegmentExplorer = ({ data }) => {
  const [filters, setFilters] = useState({
    contractType: 'all',
    internetService: 'all',
    techSupport: 'all',
    onlineSecurity: 'all',
    paymentMethod: 'all',
    tenureRange: [0, 72],
    monthlyChargesRange: [0, 200]
  });

  // Mock data - replace with actual filtered data
  const segmentData = [
    { segment: 'High Risk', count: 450, churnRate: 45.2 },
    { segment: 'Medium Risk', count: 800, churnRate: 25.8 },
    { segment: 'Low Risk', count: 1200, churnRate: 12.3 }
  ];

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleApplyFilters = () => {
    // Implement filter logic here
    console.log('Applied filters:', filters);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Segment Explorer
        </Typography>

        <Grid container spacing={3}>
          {/* Filter Controls */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Filter Options
            </Typography>
            
            <Grid container spacing={2}>
              {/* Contract Type */}
              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <InputLabel>Contract Type</InputLabel>
                  <Select
                    value={filters.contractType}
                    label="Contract Type"
                    onChange={(e) => handleFilterChange('contractType', e.target.value)}
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="month-to-month">Month-to-Month</MenuItem>
                    <MenuItem value="one-year">One Year</MenuItem>
                    <MenuItem value="two-year">Two Year</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Internet Service */}
              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <InputLabel>Internet Service</InputLabel>
                  <Select
                    value={filters.internetService}
                    label="Internet Service"
                    onChange={(e) => handleFilterChange('internetService', e.target.value)}
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="fiber">Fiber Optic</MenuItem>
                    <MenuItem value="dsl">DSL</MenuItem>
                    <MenuItem value="none">No Internet</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Tech Support */}
              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <InputLabel>Tech Support</InputLabel>
                  <Select
                    value={filters.techSupport}
                    label="Tech Support"
                    onChange={(e) => handleFilterChange('techSupport', e.target.value)}
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Online Security */}
              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <InputLabel>Online Security</InputLabel>
                  <Select
                    value={filters.onlineSecurity}
                    label="Online Security"
                    onChange={(e) => handleFilterChange('onlineSecurity', e.target.value)}
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Payment Method */}
              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <InputLabel>Payment Method</InputLabel>
                  <Select
                    value={filters.paymentMethod}
                    label="Payment Method"
                    onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="electronic">Electronic Check</MenuItem>
                    <MenuItem value="mailed">Mailed Check</MenuItem>
                    <MenuItem value="bank">Bank Transfer</MenuItem>
                    <MenuItem value="credit">Credit Card</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Tenure Range */}
              <Grid item xs={12}>
                <Typography gutterBottom>Tenure (months)</Typography>
                <Slider
                  value={filters.tenureRange}
                  onChange={(e, newValue) => handleFilterChange('tenureRange', newValue)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={72}
                />
              </Grid>

              {/* Monthly Charges Range */}
              <Grid item xs={12}>
                <Typography gutterBottom>Monthly Charges ($)</Typography>
                <Slider
                  value={filters.monthlyChargesRange}
                  onChange={(e, newValue) => handleFilterChange('monthlyChargesRange', newValue)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={200}
                />
              </Grid>

              {/* Apply Filters Button */}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleApplyFilters}
                >
                  Apply Filters
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {/* Segment Analysis */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Segment Analysis
            </Typography>
            <Box height={400} className="chart-container segment-explorer">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={segmentData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="segment" />
                  <YAxis yAxisId="left" label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'Churn Rate (%)', angle: 90, position: 'insideRight' }} />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="count" name="Customer Count" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="churnRate" name="Churn Rate" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SegmentExplorer; 