import { Container, Grid } from "@mui/material";
import React from "react";
import { RevenueChart } from "../components/charts/RevenueChart/RevenueChart";

export const DashboardPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <RevenueChart />
        </Grid>
        {/* Add more dashboard widgets here */}
      </Grid>
    </Container>
  );
};
