import React, { Fragment, useEffect, useState } from 'react';
import { AdminLayout } from '../../components/layouts';
import { DashboardOutlined } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { SummaryTile } from '../../components/admin';
import { cardsListDashboard } from '../../utils';
import useSWR from 'swr';
import { IDashboardSummaryResponse } from './../../interface/dashboard';

const DashboardPage = () => {

  const { data, error, isLoading } = useSWR<IDashboardSummaryResponse>('/api/admin/dashboard', {
    refreshInterval: 30 * 1000, // 30 segundos
  });

  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn((refreshIn) => refreshIn > 0 ? refreshIn - 1 : 30);
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  if (isLoading) return <span>Cargando</span>;

  if (error) {
    console.log(error);
    return <Typography color="rebeccapurple" >Error al cargar la información</Typography>;
  }

  const valuesData = Object.values(data!);

  const getListItemsDashboard = cardsListDashboard.map((card, index) => {

    return (
      <Fragment key={index} >
        <SummaryTile title={valuesData[index] || refreshIn} subtitle={card.subTitle} icon={card.icon} />;
      </Fragment>
    );
  });

  return (
    <AdminLayout
      title="Dashboard"
      subTitle="Estadisticas generales"
      icon={<DashboardOutlined />}
    >

      <Grid container spacing={2} >

        {
          data && getListItemsDashboard
        }

      </Grid>

    </AdminLayout>
  );
};

export default DashboardPage;