import 'package:avatar_glow/avatar_glow.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/all.dart';
import 'package:Shoma/song_screen.dart';
import 'package:Shoma/viewmodels/home_vm.dart';

class HomePage extends HookWidget {
  @override
  Widget build(BuildContext context) {
    final vm = useProvider(homeViewModel);
    return ProviderListener<HomeViewModel>(
      provider: homeViewModel,
      onChange: (context, vm) {
        if (vm.success) {
          Navigator.push(
              context,
              MaterialPageRoute(
                  builder: (context) => SongScreen(
                        song: vm.currentSong,
                      )));
        }
      },
      child: Scaffold(
        backgroundColor: Color(0xFF7d8183),
        body: Container(
            height: MediaQuery.of(context).size.height,
            width: MediaQuery.of(context).size.width,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Text(
                  'Search',
                  style: TextStyle(color: Colors.white, fontSize: 30),
                ),
                Align(
                  alignment: Alignment.bottomCenter,
                  child: Text('Powered By Labelscoin™'),
                ),
                SizedBox(
                  height: 40,
                ),
                AvatarGlow(
                  endRadius: 200.0,
                  animate: vm.isRecognizing,
                  child: GestureDetector(
                    onTap: () => vm.isRecognizing
                        ? vm.stopRecognizing()
                        : vm.startRecognizing(),
                    child: Material(
                      shape: CircleBorder(),
                      elevation: 8,
                      child: Container(
                        padding: EdgeInsets.all(40),
                        height: 250,
                        width: 250,
                        decoration: BoxDecoration(
                            shape: BoxShape.circle, color: Color(0xFF7d8183)),
                        child: Image.asset(
                          'assets/images/shazam-logo.png',
                          height: 350,
                          width: 350,
                        ),
                      ),
                    ),
                  ),
                )
              ],
            )),
      ),
    );
  }
}
