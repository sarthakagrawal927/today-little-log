import { JournalEntry } from '@/hooks/useJournalEntries';
import { BookOpen } from 'lucide-react';

interface PastEntriesProps {
  entries: JournalEntry[];
}

export function PastEntries({ entries }: PastEntriesProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (dateStr === yesterday.toISOString().split('T')[0]) {
      return 'Yesterday';
    }

    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getDaysAgo = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = today.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return '1 week ago';
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 60) return '1 month ago';
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  if (entries.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
          <BookOpen className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground font-sans">
          Your past entries will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-display font-medium text-foreground mb-6">
        Previous Days
      </h2>
      
      <div className="space-y-3">
        {entries.map((entry, index) => (
          <div
            key={entry.date}
            className="animate-slide-up group"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="journal-paper rounded-lg shadow-soft p-5 transition-all duration-300 hover:shadow-card hover:-translate-y-0.5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-display font-medium text-foreground">
                    {formatDate(entry.date)}
                  </p>
                  <p className="text-xs text-journal-date font-sans">
                    {getDaysAgo(entry.date)}
                  </p>
                </div>
              </div>
              <p className="text-sm font-sans text-journal-ink line-clamp-3 leading-relaxed">
                {entry.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
