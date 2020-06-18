package main

import (
	"fmt"
	"github.com/snowlyg/ffmpegTest"
	"time"

	"github.com/kataras/iris/v12"
	"github.com/snowlyg/IrisAdminApi/backend/config"
)

func main() {

	//rtspServer := flv_server.GetServer()
	go func() {
		inFilename := "rtsp://183.59.168.27/PLTV/88888905/224/3221227272/10000100000000060000000001030757_0.smil?icip=88888888"
		ffmpegTest.ToHls(inFilename, config.Config.RecordPath)
		fmt.Println(config.Config.RecordPath)
		//log.Printf("Prepare to save stream to local....")
		//defer log.Printf("End save stream to local....")
		//var pusher *Pusher
		//addChnOk := true
		//removeChnOk := true
		//for addChnOk || removeChnOk {
		//	select {
		//	case pusher, addChnOk = <-server.addPusherCh:
		//		if addChnOk {
		//
		//			pusherPath := path.Join(config.Config.RecordPath, pusher.Path)
		//			err = libs.CreateFile(pusherPath)
		//			if err != nil {
		//				log.Printf("EnsureDir:[%s] err:%v.", pusherPath, err)
		//				continue
		//			}
		//
		//
		//			pusherPath = path.Join(pusherPath, fmt.Sprintf("out.m3u8"))
		//
		//		} else {
		//			log.Printf("addPusherChan closed")
		//		}
		//	case pusher, removeChnOk = <-server.removePusherCh:
		//		if removeChnOk {
		//
		//		} else {
		//
		//		}
		//	}
		//}
	}()

	f := NewLogFile()
	defer f.Close()

	api := NewApp()
	//api.Logger().SetOutput(f) //记录日志

	if config.Config.HTTPS {
		host := fmt.Sprintf("%s:%d", config.Config.Host, 443)
		if err := api.Run(iris.TLS(host, config.Config.Certpath, config.Config.Certkey)); err != nil {
			fmt.Println(err)
		}
	} else {
		if err := api.Run(
			iris.Addr(fmt.Sprintf("%s:%d", config.Config.Host, config.Config.Port)),
			iris.WithoutServerError(iris.ErrServerClosed),
			iris.WithOptimizations,
			iris.WithTimeFormat(time.RFC3339),
		); err != nil {
			fmt.Println(err)
		}
	}

}
