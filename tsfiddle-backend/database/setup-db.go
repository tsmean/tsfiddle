package main

import (
	"github.com/aws/aws-sdk-go/service/rds"
	"fmt"
	"github.com/aws/aws-sdk-go/aws/session"
	"os"
)

func main() {
	sess, err := session.NewSession()
	if err != nil {
		fmt.Println("Could not start session")
		os.Exit(1)
	} else {
		fmt.Println("Session started")
	}
	creds, err2 := sess.Config.Credentials.Get()
	if err2 != nil {
		fmt.Println("No/Wrong credentials")
		os.Exit(1)
	} else {
		fmt.Println("Creds seem to be working.")
		fmt.Println("Using the key:" + creds.AccessKeyID)
	}
	svc := rds.New(sess)
	svc.

}
