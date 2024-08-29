const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-muted border-t-primary" />
    </div>
  );
};

export default Loading;
