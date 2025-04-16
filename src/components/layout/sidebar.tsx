import {
    LayoutDashboard,
    Package,
    Palette,
    ShoppingCart,
    Users,
    SquareStack,
    TicketPercent,
  } from 'lucide-react';
  
  import {
    Sidebar as UiSideBar,
    SidebarContent,
    SidebarFooter as UiSideBarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
  } from '@/components/ui/sidebar';
  
  import { SidebarFooter } from './sidebarFooter';
  
  // Updated navigation items as requested
  const navigationItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      href: '/',
      isActive: true,
    },
    {
      title: 'Categorias',
      icon: SquareStack,
      href: '/categorias',
    },
    {
      title: 'Temas',
      icon: Palette,
      href: '/temas',
    },
    {
      title: 'Produtos',
      icon: Package,
      href: '/produtos',
    },
    {
      title: 'Pedidos',
      icon: ShoppingCart,
      href: '/pedidos',
    },
    {
      title: 'Clientes',
      icon: Users,
      href: '/clientes',
    },
    {
      title: 'Cupoms',
      icon: TicketPercent,
      href: '/cupoms',
    }
  ];
  
  export function Sidebar() {
    return (
      <UiSideBar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-4 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Package className="h-4 w-4" />
            </div>
            <span className="text-lg font-semibold">Geeknizado</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Módulos</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <UiSideBarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarFooter />
            </SidebarMenuItem>
          </SidebarMenu>
        </UiSideBarFooter>
        <SidebarRail />
      </UiSideBar>
    );
  }