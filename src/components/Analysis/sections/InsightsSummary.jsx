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
        return '#ef4444'; // red
      case 'trend':
        return '#f59e0b'; // orange
      case 'positive':
        return '#14b8a6'; // teal
      case 'info':
        return '#3b82f6'; // blue
      default:
        return 'inherit';
    }
  };

  return (
    <Card style={{ borderRadius: 20, boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)' }}>
      <CardContent className="insights-summary-card">
        <Typography variant="h6" gutterBottom className="teal-text" style={{ fontWeight: 700 }}>
          Insights Summary
        </Typography>
        <div className="insights-summary-content">
          <div className="insights-summary-list">
            <List>
              {insights.map((insight, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start" style={{ paddingTop: 18, paddingBottom: 18 }}>
                    <ListItemIcon style={{ minWidth: 40, marginTop: 2 }}>
                      {insight.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body1"
                          style={{ color: getInsightColor(insight.type), fontWeight: 600, fontSize: '1.08rem', lineHeight: 1.6 }}
                        >
                          {insight.text}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {index < insights.length - 1 && <div style={{ height: 4 }} />}
                </React.Fragment>
              ))}
            </List>
          </div>
          <div className="insights-summary-description">
            <Typography variant="subtitle2" style={{ color: '#64748b', fontSize: '0.95rem' }}>
              Insights are automatically generated based on the analysis of customer data and churn patterns.
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightsSummary; 