export const SiteFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 pt-12 border-t border-surface-200 dark:border-surface-800 text-center text-surface-400 dark:text-surface-600 text-sm font-medium">
      &copy; {currentYear} LifeLog Timeline. All rights reserved.
    </footer>
  );
};
