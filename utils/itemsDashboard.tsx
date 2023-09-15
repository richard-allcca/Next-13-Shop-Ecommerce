import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CategoryOutlined,
  CreditCardOffOutlined,
  CreditCardOutlined,
  GroupOutlined,
  ProductionQuantityLimitsOutlined
} from '@mui/icons-material';


export const cardsListDashboard = [
  {
    title: '1',
    subTitle: 'Ordenes totales',
    icon: <CreditCardOutlined color="secondary" sx={{ fontSize: 40 }} />
  },
  {
    title: '2',
    subTitle: 'Ordenes pagadas',
    icon: <AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />
  },
  {
    title: '3',
    subTitle: 'Ordenes pendientes',
    icon: <CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />
  },
  {
    title: '4',
    subTitle: 'Clientes',
    icon: <GroupOutlined color="primary" sx={{ fontSize: 40 }} />
  },
  {
    title: '5',
    subTitle: 'Productos',
    icon: <CategoryOutlined color="warning" sx={{ fontSize: 40 }} />
  },
  {
    title: '6',
    subTitle: 'Sin Existencias',
    icon: <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} />
  },
  {
    title: '7',
    subTitle: 'Bajo inventario',
    icon: <ProductionQuantityLimitsOutlined color="warning" sx={{ fontSize: 40 }} />
  },
  {
    title: '8',
    subTitle: 'Actualización en:',
    icon: <AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} />
  },
];