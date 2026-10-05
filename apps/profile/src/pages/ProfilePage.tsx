import { Card, Button, Badge } from "@sms/ui";
import styles from "./ProfilePage.module.css";

const MOCK_PROFILE = {
  name: "Иван Петров",
  email: "ivan@example.com",
  role: "Администратор",
  avatar: "👤",
  status: "Активен",
};

export default function ProfilePage() {
  return (
    <div className={styles.page}>
      <h1>👤 Профиль пользователя</h1>
      <Card>
        <div className={styles.profile}>
          <div className={styles.avatar}>{MOCK_PROFILE.avatar}</div>
          <div className={styles.info}>
            <h2>{MOCK_PROFILE.name}</h2>
            <p>{MOCK_PROFILE.email}</p>
            <div className={styles.badges}>
              <Badge variant="info">{MOCK_PROFILE.role}</Badge>
              <Badge variant="success">{MOCK_PROFILE.status}</Badge>
            </div>
          </div>
        </div>
        <div className={styles.actions}>
          <Button variant="primary">Редактировать</Button>
          <Button variant="danger">Выйти</Button>
        </div>
      </Card>
    </div>
  );
}
