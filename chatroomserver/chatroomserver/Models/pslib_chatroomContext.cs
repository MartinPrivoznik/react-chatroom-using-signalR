using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace chatroomserver.Models
{
    public partial class pslib_chatroomContext : DbContext
    {
        public pslib_chatroomContext()
        {
        }

        public pslib_chatroomContext(DbContextOptions<pslib_chatroomContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Messages> Messages { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=DESKTOP-9FF64QC;Database=pslib_chatroom;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Messages>(entity =>
            {
                entity.ToTable("messages");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.TargetUserId)
                    .IsRequired()
                    .HasColumnName("target_user_id")
                    .HasMaxLength(70);

                entity.Property(e => e.Text)
                    .HasColumnName("text")
                    .HasMaxLength(200);

                entity.Property(e => e.Time)
                    .HasColumnName("time")
                    .HasColumnType("datetime");

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasColumnName("user_id")
                    .HasMaxLength(70);

                entity.HasOne(d => d.TargetUser)
                    .WithMany(p => p.MessagesTargetUser)
                    .HasForeignKey(d => d.TargetUserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_messages_users1");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.MessagesUser)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_messages_users");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.ToTable("users");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasMaxLength(70);

                entity.Property(e => e.Gender)
                    .HasColumnName("gender")
                    .HasMaxLength(20);

                entity.Property(e => e.GivenName)
                    .HasColumnName("given_name")
                    .HasMaxLength(50);

                entity.Property(e => e.LastName)
                    .HasColumnName("last_name")
                    .HasMaxLength(50);

                entity.Property(e => e.MiddleName)
                    .HasColumnName("middle_name")
                    .HasMaxLength(50);

                entity.Property(e => e.PreferredUsername)
                    .HasColumnName("preferred_username")
                    .HasMaxLength(80);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
