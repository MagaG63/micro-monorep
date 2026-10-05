import { useState } from "react";
import { Card, StatCard, Badge } from "@sms/ui";
import { formatNumber, formatDate } from "@sms/utils";
import type { SmsMessage } from "@sms/types";
import "./styles.css";

// ─── Мок-данные для демонстрации ─────────────────────────────────────────────
const MOCK_MESSAGES: SmsMessage[] = [
  {
    id: "1",
    phone: "79161234567",
    text: "Ваш код подтверждения: 1234",
    status: "delivered",
    sentAt: "2024-01-15T10:00:00Z",
    userId: "u1",
  },
  {
    id: "2",
    phone: "79169876543",
    text: "Заказ #456 доставлен",
    status: "delivered",
    sentAt: "2024-01-15T11:30:00Z",
    userId: "u2",
  },
  {
    id: "3",
    phone: "79051112233",
    text: "Напоминание о встрече в 15:00",
    status: "sent",
    sentAt: "2024-01-14T09:00:00Z",
    userId: "u1",
  },
  {
    id: "4",
    phone: "79034445566",
    text: "Акция! Скидка 20% до конца дня",
    status: "failed",
    sentAt: "2024-01-15T12:00:00Z",
    userId: "u3",
  },
];

export function DashboardApp() {
  const [activeTab, setActiveTab] = useState<"overview" | "messages">(
    "overview",
  );
  const [messages] = useState<SmsMessage[]>(MOCK_MESSAGES);

  const totalSent = messages.length;
  const deliveredCount = messages.filter(
    (m) => m.status === "delivered",
  ).length;
  const failedCount = messages.filter((m) => m.status === "failed").length;

  return (
    <div className="dashboard-root">
      <div className="dashboard-header">
        <h1>📊 Дашборд SMS</h1>
        <p>Module Federation Remote — порт 3002</p>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab ${activeTab === "overview" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Обзор
        </button>
        <button
          className={`tab ${activeTab === "messages" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("messages")}
        >
          Сообщения
        </button>
      </div>

      {activeTab === "overview" && (
        <div className="stats-grid">
          <StatCard
            label="Всего отправлено"
            value={formatNumber(totalSent)}
            variant="primary"
          />
          <StatCard
            label="Доставлено"
            value={formatNumber(deliveredCount)}
            variant="success"
          />
          <StatCard
            label="Ошибка"
            value={formatNumber(failedCount)}
            variant="danger"
          />
          <StatCard
            label="% доставки"
            value={`${Math.round((deliveredCount / totalSent) * 100)}%`}
            variant="warning"
          />
        </div>
      )}

      {activeTab === "messages" && (
        <div className="messages-grid">
          {messages.map((msg) => (
            <Card key={msg.id}>
              <div className="message-row">
                <div className="message-info">
                  <span className="message-phone">{msg.phone}</span>
                  <span className="message-text">{msg.text}</span>
                  <span className="message-date">{formatDate(msg.sentAt)}</span>
                </div>
                <Badge
                  variant={
                    msg.status === "delivered"
                      ? "success"
                      : msg.status === "failed"
                        ? "danger"
                        : "warning"
                  }
                >
                  {msg.status}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// Default export — обязателен для Module Federation:
// shell грузит модуль через React.lazy, которому нужен .default
export default DashboardApp;
