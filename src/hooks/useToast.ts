import { toast } from 'sonner';

type useToastParams = {
  title: string;
  description?: string;
  closeButton?: boolean;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  duration?: number;
  variant: 'error' | 'warning' | 'success' | 'default';
};

export function useToast() {
  return ({ title, description, variant }: useToastParams) => {
    if (variant === 'error') {
      toast(title, {
        description,
        closeButton: true,
        position: 'top-right',
        style: {
          background: 'var(--destructive)',
          color: 'var(--secondary-foreground)',
        },
      });
    }

    if (variant === 'warning') {
      toast(title, {
        description,
        closeButton: true,
        position: 'top-right',
        style: {
          background: 'var(--warning-foreground)',
          color: 'var(--secondary-foreground)',
        },
      });
    }

    if (variant === 'success') {
      toast(title, {
        description,
        closeButton: true,
        position: 'top-right',
        style: {
          background: 'var(--success-foreground)',
          color: 'var(--background)',
        },
      });
    }
  };
}
