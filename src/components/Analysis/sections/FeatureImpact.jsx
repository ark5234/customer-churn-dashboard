import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FeatureImpact = ({ data }) => {
  // Mock data - replace with actual SHAP values from your model
  const featureImportance = [
    { feature: 'Contract Type', importance: 0.35, impact: 'High' },
    { feature: 'Tech Support', importance: 0.28, impact: 'High' },
    { feature: 'Monthly Charges', importance: 0.22, impact: 'Medium' },
    { feature: 'Online Security', importance: 0.18, impact: 'Medium' },
    { feature: 'Internet Service', importance: 0.15, impact: 'Medium' }
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Feature Impact on Churn
        </Typography>

        {/* Feature Importance Chart */}
        <Box height={300} className="chart-container feature-impact">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={featureImportance}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 0.4]} />
              <YAxis type="category" dataKey="feature" width={100} />
              <Tooltip />
              <Legend />
              <Bar dataKey="importance" name="Feature Importance" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Key Insights */}
        <Box mt={2}>
          <Typography variant="subtitle1" gutterBottom>
            Key Insights:
          </Typography>
          <ul>
            {featureImportance.map((feature, index) => (
              <li key={index}>
                <Typography variant="body2">
                  {feature.feature}: {feature.impact} impact on churn probability
                </Typography>
              </li>
            ))}
          </ul>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FeatureImpact; 