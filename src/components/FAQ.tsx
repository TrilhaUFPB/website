'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { usePostHogTracking } from '@/hooks/usePostHogTracking';
import { SectionHead } from '@/components/home/shared';
import type { FAQ as FAQItem } from '@/components/home/data';

const DAY_KEYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;

export default function FAQ() {
  const { t } = useTranslation();
  const { trackFAQInteraction } = usePostHogTracking();
  const questions = t<FAQItem[]>('faq.questions');
  const colors = t<Record<string, string>>('faq.colors');
  const colorSuffix = t('faq.colorSuffix');

  const [open, setOpen] = useState(0);
  const [todayColor, setTodayColor] = useState<string | null>(null);

  useEffect(() => {
    setTodayColor(colors[DAY_KEYS[new Date().getDay()]]);
  }, [colors]);

  const toggle = (i: number) => {
    const willOpen = open !== i;
    setOpen(willOpen ? i : -1);
    if (willOpen) {
      trackFAQInteraction('expand', i, questions[i]?.q);
    } else {
      trackFAQInteraction('collapse');
    }
  };

  return (
    <section id="faq" className="section">
      <div className="container">
        <SectionHead eyebrow={t('faq.eyebrow')} title={t('faq.title')} />
        <div className="faq-list reveal">
          {questions.map((f, i) => {
            const isTiago = f.easterEgg === 'tiagoColor';
            const answer = isTiago && todayColor ? `${f.a}${todayColor}${colorSuffix}` : f.a;
            return (
              <div
                key={i}
                className={`faq-item ${open === i ? 'open' : ''}`}
                onClick={() => toggle(i)}
              >
                <button className="faq-q">
                  <span className="display" style={{ fontSize: 24 }}>
                    {f.q}
                  </span>
                  <span className="faq-mark">{open === i ? '−' : '+'}</span>
                </button>
                <div className="faq-a-wrap">
                  <p className="faq-a">{answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
