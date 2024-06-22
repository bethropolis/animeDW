// backend/storage/storage.go
package storage

import (
    "os"
)

type Storage struct{}

func NewStorage() *Storage {
    return &Storage{}
}

func (s *Storage) Read(filename string) (string, error) {
    data, err := os.ReadFile(filename)
    if err != nil {
        return "", err
    }
    return string(data), nil
}

func (s *Storage) Write(filename, data string) error {
    return os.WriteFile(filename, []byte(data), 0644)
}
