import { TodayPrompt } from '@/components/TodayPrompt';
import { PastEntries } from '@/components/PastEntries';
import { useJournalEntries } from '@/hooks/useJournalEntries';
import { Feather } from 'lucide-react';

const Index = () => {
  const { getTodayEntry, getRecentEntries, saveEntry, isLoaded } = useJournalEntries();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse">
          <Feather className="h-8 w-8 text-primary" />
        </div>
      </div>
    );
  }

  const todayEntry = getTodayEntry();
  const pastEntries = getRecentEntries(20);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-6 px-4 border-b border-border/50">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Feather className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display font-semibold text-foreground text-lg">
              Daily Journal
            </h1>
            <p className="text-xs text-muted-foreground font-sans">
              A moment for reflection
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        {/* Today's Entry */}
        <section className="mb-12">
          <TodayPrompt
            todayEntry={todayEntry}
            onSave={(content) => saveEntry(content)}
          />
        </section>

        {/* Divider */}
        {pastEntries.length > 0 && (
          <div className="relative my-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 text-sm text-muted-foreground font-sans">
                Looking back
              </span>
            </div>
          </div>
        )}

        {/* Past Entries */}
        <section>
          <PastEntries entries={pastEntries} />
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center">
        <p className="text-xs text-muted-foreground font-sans">
          Your thoughts, safely stored in your browser
        </p>
      </footer>
    </div>
  );
};

export default Index;
