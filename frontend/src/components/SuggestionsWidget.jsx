import { ChevronRight, ShieldCheck, Share2, DollarSign, FileText, Settings } from 'lucide-react';

export default function SuggestionsWidget() {
    return (
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', marginBottom: '3rem', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '0.8rem', background: '#3b82f6', borderRadius: '50%', color: 'white' }}>
                    <Settings size={24} />
                </div>
                <div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.3rem' }}>
                        Предложения по улучшению
                    </h3>
                    <p style={{ color: 'var(--color-text-muted)' }}>
                        Максимизируйте свои шансы на продажу.
                    </p>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <SuggestionItem
                    icon={<ShieldCheck size={20} />}
                    title="Отсутствуют проверенные данные"
                    text="У вас есть подходящая интеграция (ы), которая не подключена. Включите проверенные данные в свой список, чтобы повысить свои шансы на продажу."
                />
                <SuggestionItem
                    icon={<Share2 size={20} />}
                    title="Отсутствуют аккаунты в социальных сетях"
                    text="Есть ли у вас какие-либо учетные записи в социальных сетях или список адресов электронной почты? Если да, обязательно сообщите подробности."
                />
                <SuggestionItem
                    icon={<DollarSign size={20} />}
                    title="Отсутствующие финансы"
                    text="Пожалуйста, дайте подробную информацию о ваших доходах и расходах. Если финансовые средства не предоставлены, вы будете указаны как сайт, не приносящий доход."
                />
                <SuggestionItem
                    icon={<FileText size={20} />}
                    title="Отсутствующие вложения"
                    text="Добавляйте файлы, скриншоты или видеопроходы, которые четко показывают вашу учетную запись и доказательства заявленных финансовых показателей."
                />
            </div>
        </div>
    );
}

function SuggestionItem({ icon, title, text }) {
    return (
        <div style={{
            background: '#eff6ff', // Light blue bg provided in screenshot
            padding: '1.5rem',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            border: '1px solid #dbeafe'
        }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
            <div style={{ maxWidth: '90%' }}>
                <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#1e3a8a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {/* {icon} Icon optionally displayed inline or separate */}
                    {title}
                </h4>
                <p style={{ fontSize: '0.95rem', color: '#1e40af', lineHeight: 1.5 }}>
                    {text}
                </p>
            </div>
            <div style={{ color: '#2563eb' }}>
                <ChevronRight size={20} />
            </div>
        </div>
    );
}
