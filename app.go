package main

import (
	"animeDW/backend/api"
	"animeDW/backend/storage"
	"context"
	"fmt"
)

// App struct
type App struct {
	ctx     context.Context
	client  *api.Client
	storage *storage.Storage
}

// NewApp creates a new App application struct
func NewApp() *App {
	client := api.NewClient("https://aniwave.to")
	storage := storage.NewStorage()
	return &App{client: client, storage: storage}
}

// startup is called at application startup
func (a *App) startup(ctx context.Context) {
	// Perform your setup here
	a.ctx = ctx
}

// domReady is called after front-end resources have been loaded
func (a App) domReady(ctx context.Context) {
	// Add your action here
}

func (a *App) beforeClose(ctx context.Context) (prevent bool) {
	return false
}

// shutdown is called at application termination
func (a *App) shutdown(ctx context.Context) {
	// Perform your teardown here
}
func (a *App) Get(url string, headers map[string]string) (string, error) {
    return a.client.Get(url, headers)
}


// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show fuckrtg!", name)
}
