import React from 'react';
import { Card, CardContent, Typography, Box, Grid, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';

const InsightsSummary = ({ data }) => {
  // Mock insights - replace with actual generated insights
  const insights = [
    {
      type: 'high-risk',
      text: 'Customers with month-to-month contracts and no tech support churn at 52%, which is 2.5× higher than those on yearly contracts with support.',
      icon: <WarningIcon color="error" />
    },
    {
      type: 'trend',
      text: 'Fiber optic customers show a 41.9% churn rate, significantly higher than DSL (19.2%) or no internet (7.2%).',
      icon: <TrendingUpIcon color="error" />
    },
    {
      type: 'positive',
      text: 'Two-year contract customers with tech support have the lowest churn rate at 1.4%.',
      icon: <TrendingDownIcon color="success" />
    },
    {
      type: 'info',
      text: 'Electronic check users are 3× more likely to churn compared to credit card users.',
      icon: <InfoIcon color="info" />
    },
    {
      type: 'high-risk',
      text: 'Senior citizens without online security have a 48.7% churn rate.',
      icon: <WarningIcon color="error" />
    },
    {
      type: 'trend',
      text: 'New customers (0-12 months) have a 35.2% churn rate, decreasing to 15.3% for long-term customers.',
      icon: <TrendingDownIcon color="success" />
    },
    {
      type: 'info',
      text: 'Customers with multiple services (phone, internet, streaming) show 25% lower churn rates.',
      icon: <InfoIcon color="info" />
    },
    {
      type: 'high-risk',
      text: 'High monthly charges (>$90) correlate with 45% higher churn probability.',
      icon: <WarningIcon color="error" />
    }
  ];

  const getInsightColor = (type) => {
    switch (type) {
      case 'high-risk':
        return 'error.main';
      case 'trend':
        return 'warning.main';
      case 'positive':
        return 'success.main';
      case 'info':
        return 'info.main';
      default:
        return 'text.primary';
    }
  };

  return (
    <Card>
      <CardContent className="insights-summary-card">
        <Typography variant="h6" gutterBottom>
          Insights Summary
        </Typography>
        <div className="insights-summary-content">
          <div className="insights-summary-list">
            <List>
              {insights.map((insight, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      {insight.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body1"
                          color={getInsightColor(insight.type)}
                          sx={{ fontWeight: 'medium' }}
                        >
                          {insight.text}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {index < insights.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </div>
          <div className="insights-summary-description">
            <Typography variant="subtitle2" color="text.secondary">
              Insights are automatically generated based on the analysis of customer data and churn patterns.
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightsSummary; 