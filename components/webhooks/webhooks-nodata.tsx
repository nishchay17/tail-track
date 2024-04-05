function WebhooksNodata() {
  return (
    <div className="border border-white/30 rounded-lg bg-background">
      <div className="min-h-[30vh] flex flex-col items-center justify-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          You have no Webhooks added
        </h3>
        <p className="text-muted-foreground">
          You can send events to your webhook for tracking
        </p>
      </div>
    </div>
  );
}

export default WebhooksNodata;
