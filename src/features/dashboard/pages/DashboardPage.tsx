import { Container, Grid } from "@mui/material";
import React from "react";
import { ExpenseCategoriesChart } from "../components/charts/ExpenseCategoriesChart/ExpenseCategoriesChart";
import { ProfitChart } from "../components/charts/ProfitChart/ProfitChart";
import { RevenueChart } from "../components/charts/RevenueChart/RevenueChart";

export const DashboardPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <RevenueChart />
        </Grid>
        <Grid item xs={12}>
          <ProfitChart />
        </Grid>
        <Grid item xs={12}>
          <ExpenseCategoriesChart />
        </Grid>
        {/* Add more dashboard widgets here */}
      </Grid>
    </Container>
  );
};
