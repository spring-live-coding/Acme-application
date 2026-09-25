// assets
import { DashboardOutlined, ProjectOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  ProjectOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'project-setup',
      title: 'Project setup',
      type: 'item',
      url: '/project-setup',
      icon: icons.ProjectOutlined
    }
  ]
};

export default dashboard;
