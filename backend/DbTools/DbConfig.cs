using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Npgsql;

namespace backend.DbTools
{
    public static class DbConfig
    {
        public static NpgsqlConnection? Connection { get; private set; }
        public static string DB_PORT { get; } = Environment.GetEnvironmentVariable(nameof(DB_PORT)) ?? "5432";
        public static string DB_HOST { get; } = Environment.GetEnvironmentVariable(nameof(DB_HOST)) ?? "localhost";
        public static string DB_USER { get; } = Environment.GetEnvironmentVariable(nameof(DB_USER)) ?? "postgres";
        public static string DB_PASSWORD { get; } = Environment.GetEnvironmentVariable(nameof(DB_PASSWORD)) ?? "admin";
        public static string DB_NAME { get; } = Environment.GetEnvironmentVariable(nameof(DB_NAME)) ?? "chat_db";

        public static NpgsqlConnection? m_conn { get; private set; } 
        public static NpgsqlCommand? m_createtbl_cmd { get; private set; } 
        
        public static string GetConnectionString()
        {
            return $"Host={DB_HOST};Username={DB_USER};Password={DB_PASSWORD};Database={DB_NAME}";
        }

        public static void InitConnection()
        {
            Connection = new NpgsqlConnection(GetConnectionString());
        }

        public static void CreateTable()
        {
            
            m_conn = new NpgsqlConnection(GetConnectionString());
            m_createtbl_cmd = new NpgsqlCommand(
            "CREATE TABLE if not exists user_message(id SERIAL NOT NULL, chat_user_name character varying(255), msg text DEFAULT 'DELETED USER'::text, create_time timestamp without time zone NOT NULL DEFAULT now(), PRIMARY KEY(id));"
            , m_conn);
            m_conn.Open();
            m_createtbl_cmd.ExecuteNonQuery();
            m_conn.Close();
        }
        
    }
}