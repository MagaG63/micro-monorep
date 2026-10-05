import { useState, type FormEvent } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Card, CardHeader, CardBody, Button, StatusBadge } from "@sms/ui";
import { formatDate, formatPhone } from "@sms/utils";
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
    status: "sent",
    sentAt: "2024-01-15T11:30:00Z",
    userId: "u2",
  },
  {
    id: "3",
    phone: "79051112233",
    text: "Напоминание о встрече в 15:00",
    status: "failed",
    sentAt: "2024-01-14T09:00:00Z",
    userId: "u1",
  },
  {
    id: "4",
    phone: "79034445566",
    text: "Акция! Скидка 20% до конца дня",
    status: "pending",
    sentAt: "2024-01-15T12:00:00Z",
    userId: "u3",
  },
];

// ─── Список сообщений ─────────────────────────────────────────────────────────
const MessageList = () => {
  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h2>Админ-панель — SMS Сообщения</h2>
        <Link to="..">
          <Button variant="secondary" size="sm">
            ← В Shell
          </Button>
        </Link>
      </div>
      <div className="admin-page__grid">
        {MOCK_MESSAGES.map((msg) => (
          <Card key={msg.id}>
            <CardHeader>
              <StatusBadge status={msg.status} label={msg.status} />
            </CardHeader>
            <CardBody>
              <p>
                <strong>Телефон:</strong> {formatPhone(msg.phone)}
              </p>
              <p>
                <strong>Текст:</strong> {msg.text}
              </p>
              <p>
                <strong>Отправлено:</strong> {formatDate(msg.sentAt)}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ─── Создание сообщения ───────────────────────────────────────────────────────
const CreateMessage = () => {
  const [phone, setPhone] = useState("");
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2000);
  };

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h2>Создать SMS</h2>
        <Link to="..">
          <Button variant="secondary" size="sm">
            ← К списку
          </Button>
        </Link>
      </div>
      <Card className="admin-form">
        <CardBody>
          {sent ? (
            <p className="admin-form__success">
              ✓ Сообщение поставлено в очередь!
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="admin-form__field">
                <label>Телефон:</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="79161234567"
                  required
                />
              </div>
              <div className="admin-form__field">
                <label>Текст сообщения:</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Введите текст..."
                  required
                />
              </div>
              <Button type="submit">Отправить SMS</Button>
            </form>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

// ─── Корневой компонент Admin ─────────────────────────────────────────────────
// Экспортируется как Module Federation remote через './App'
// Маршруты относительные: в shell живут под /admin/*, standalone — от корня
export const AdminApp = () => {
  return (
    <Routes>
      <Route index element={<MessageList />} />
      <Route path="create" element={<CreateMessage />} />
    </Routes>
  );
};

// Default export — для Module Federation
export default AdminApp;
