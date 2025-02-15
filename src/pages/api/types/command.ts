export interface RestartRequestBody {
  pm2Id: string;
  command: string;
  host: string;
  user: string;
  port: number;
  pem: string;
}