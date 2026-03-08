const NotFound = () => (
  <div className="flex min-h-screen items-center justify-center px-4">
    <div className="text-center max-w-md">
      <h1 className="text-7xl sm:text-8xl font-bold text-gradient mb-4 font-mono">
        404
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <a href="/" className="btn-primary">
        Return Home
      </a>
    </div>
  </div>
);

export default NotFound;
